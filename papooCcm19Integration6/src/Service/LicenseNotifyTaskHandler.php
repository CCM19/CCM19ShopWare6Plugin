<?php declare(strict_types=1);

namespace Papoo\Ccm19Integration\Service;

use DateTime;
use DateTimeInterface;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Psr7\Request;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\MessageQueue\ScheduledTask\ScheduledTaskHandler;
use Shopware\Core\System\SystemConfig\SystemConfigService;

final class LicenseNotifyTaskHandler extends ScheduledTaskHandler
{
	/** @var SystemConfigService */
	private $config;

	/** @var EntityRepositoryInterface */
	private $salesChannelRepo;

	/** @var Client */
	private $client;

	private $shopwareVersion;
	private $instanceId;

	private const API_TOKEN = 'xCHnQegWLeprUzBQFdPSsXAp6prvhaYI';

	/**
	 * @param SystemConfigService $configReader
	 */
	public function __construct(EntityRepositoryInterface $taskRepo, SystemConfigService $config, EntityRepositoryInterface $salesChannelRepo, string $shopwareVersion, ?string $instanceId)
	{
		parent::__construct($taskRepo);
		$this->config = $config;
		$this->salesChannelRepo = $salesChannelRepo;
		$this->shopwareVersion = $shopwareVersion;
		$this->instanceId = $instanceId;
		$this->client = new Client();
	}

	public static function getHandledMessages(): iterable
	{
		return [ LicenseNotifyTask::class ];
	}

	public function run(array $overrides=[]): void
	{
		$context = Context::createDefaultContext();

		$keys = [];
		$salesChannels = $this->salesChannelRepo->search(new Criteria(), $context);
		foreach ($salesChannels as $channel) {
			$salesChannelId = $channel->getId();
			$apiKey = $overrides[$salesChannelId] ?? $this->getIntegrationApiKey($salesChannelId);

			$keys[$apiKey] = $apiKey;
		}
		$this->submitApiKeys(array_filter(array_keys($keys)));
	}

	/**
	 * @param string|null Sales-Channel-ID (null for 'global')
	 * @return string|null
	 */
	private function getIntegrationApiKey(?string $salesChannelId): ?string
	{
		$code = $this->config->get('papooCcm19Integration6.config.integrationCode', $salesChannelId);
		if ($code) {
			$match = [];
			preg_match('~[?&;]apiKey=([^&]*)~', $code, $match);
			if ($match and $match[1]) {
				return html_entity_decode($match[1], ENT_HTML401|ENT_QUOTES, 'UTF-8');
			}
		}
		return null;
	}

	private function generateHash(array $data) {
		ksort($data);
		$string = http_build_query($data, '', '&', PHP_QUERY_RFC1738);
		return hash_hmac('sha256', $string ?? '', self::API_TOKEN);
	}

	/**
	 * @param string[] $apiKeys
	 */
	private function submitApiKeys(array $apiKeys) {
		$now = new DateTime();
		$data = [
			'reportDate' => $now->format(DateTimeInterface::ATOM),
			'instanceId' => $this->instanceId,
			'shopwareVersion' => $this->shopwareVersion,
			'ccm19ApiKeys' => $apiKeys,
		];
		$hash = $this->generateHash($data);

		$request = new Request(
			'POST',
				'https://licence.ccm19.de/shopware.php?action=register',
				['Content-Type' => 'application/x-www-form-urlencoded', 'Authorization' => "Bearer $hash"],
				http_build_query($data, '', '&', PHP_QUERY_RFC1738)
		);
		$this->client->send($request);
	}
}
