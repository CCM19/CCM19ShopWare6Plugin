<?php declare(strict_types=1);

namespace Papoo\Ccm19Integration\Service;

use DateTime;
use DateTimeInterface;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Psr7\Request;
use Psr\Log\LoggerInterface;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\MessageQueue\ScheduledTask\ScheduledTaskHandler;
use Shopware\Core\System\SystemConfig\SystemConfigService;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler(handles: LicenseNotifyTask::class)]
final class LicenseNotifyTaskHandler extends ScheduledTaskHandler
{
	/** @var SystemConfigService */
	private $config;

	/** @var EntityRepository */
	private $salesChannelRepo;

	/** @var Client */
	private $client;

	private $shopwareVersion;
	private $instanceId;

	private const API_TOKEN = 'xCHnQegWLeprUzBQFdPSsXAp6prvhaYI';

	/**
	 * @param EntityRepository $taskRepo
	 * @param SystemConfigService $config
	 * @param EntityRepository $salesChannelRepo
	 * @param string $shopwareVersion
	 * @param string|null $instanceId
	 * @param LoggerInterface|null $logger
	 */
	public function __construct(EntityRepository $taskRepo, SystemConfigService $config, EntityRepository $salesChannelRepo, string $shopwareVersion, ?string $instanceId, ?LoggerInterface $logger=null)
	{
		$this->config = $config;
		$this->salesChannelRepo = $salesChannelRepo;
		$this->shopwareVersion = $shopwareVersion;
		$this->instanceId = $instanceId;
		$this->client = new Client();

		parent::__construct($taskRepo, $logger);
	}

	public static function getHandledMessages(): iterable
	{
		return [ LicenseNotifyTask::class ];
	}

	/**
	 * @param array<string,?string> ['salesChannelId' => 'integrationCode']
	 */
	public function run(array $overrides=[]): void
	{
		$context = Context::createDefaultContext();

		$result = [];
		$salesChannels = $this->salesChannelRepo->search(new Criteria(), $context);
		foreach ($salesChannels as $channel) {
			$salesChannelId = $channel->getId();
			$data = $this->extractIntegrationApiKeyAndDomain($overrides[$salesChannelId] ?? $this->getIntegrationCode($salesChannelId));
			if ($data) {
				$result[$data['apiKey'].':'.(string)$data['domain']] = $data;
			}
		}
		$this->submitReport(array_values($result));
	}

	/**
	 * @param string|null Sales-Channel-ID (null for 'global')
	 * @return array{apiKey:string,domain:?string}|null
	 */
	private function extractIntegrationApiKeyAndDomain(?string $code): ?array
	{
		if ($code) {
			$keyMatch = [];
			$domainMatch = [];
			preg_match('~[?&;]apiKey=([^&\'"]*)~', $code, $keyMatch);
			preg_match('~[?&;]domain=([^&\'"]*)~', $code, $domainMatch);
			if ($keyMatch and $keyMatch[1]) {
				return [
					'apiKey' => html_entity_decode($keyMatch[1], ENT_HTML401|ENT_QUOTES, 'UTF-8'),
					'domain' => (empty($domainMatch[1])) ? null : html_entity_decode($domainMatch[1], ENT_HTML401|ENT_QUOTES, 'UTF-8'),
				];
			}
		}
		return null;
	}

	/**
	 * @param string|null Sales-Channel-ID (null for 'global')
	 * @return string
	 */
	private function getIntegrationCode(?string $salesChannelId): string
	{
		$code = $this->config->get('papooCcm19Integration6.config.integrationCode', $salesChannelId);
		return (string)($code ?? '');
	}

	private function generateHash(array $data) {
		ksort($data);
		$string = http_build_query($data, '', '&', PHP_QUERY_RFC1738);
		return hash_hmac('sha256', $string ?? '', self::API_TOKEN);
	}

	/**
	 * @param array[] $data
	 */
	private function submitReport(array $data) {
		$now = new DateTime();
		$data = [
			'reportDate' => $now->format(DateTimeInterface::ATOM),
			'instanceId' => $this->instanceId,
			'shopwareVersion' => $this->shopwareVersion,
			'ccm19Data' => $data,
		];
		$hash = $this->generateHash($data);

		$request = new Request(
			'POST',
				'https://licence.ccm19.de/shopware.php?action=report',
				['Content-Type' => 'application/x-www-form-urlencoded', 'Authorization' => "Bearer $hash"],
				http_build_query($data, '', '&', PHP_QUERY_RFC1738)
		);
		$this->client->send($request);
	}
}
