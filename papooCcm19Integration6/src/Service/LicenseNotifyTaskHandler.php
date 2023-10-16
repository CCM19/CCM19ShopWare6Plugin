<?php declare(strict_types=1);

namespace Papoo\Ccm19Integration\Service;

use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\MessageQueue\ScheduledTask\ScheduledTaskHandler;
use Shopware\Core\System\SystemConfig\SystemConfigService;

final class LicenseNotifyTaskHandler extends ScheduledTaskHandler
{
	/** @var SystemConfigService */
	private $config;

	/** @var EntityRepositoryInterface */
	private $salesChannelRepo;

	private const API_TOKEN = 'xCHnQegWLeprUzBQFdPSsXAp6prvhaYI';

	/**
	 * @param SystemConfigService $configReader
	 */
	public function __construct(EntityRepositoryInterface $taskRepo, SystemConfigService $config, EntityRepositoryInterface $salesChannelRepo)
	{
		parent::__construct($taskRepo);
		$this->config = $config;
		$this->salesChannelRepo = $salesChannelRepo;
	}

	public static function getHandledMessages(): iterable
	{
		return [ LicenseNotifyTask::class ];
	}

	public function run(): void
	{
		$context = Context::createDefaultContext();

		$keys = [];
		$salesChannels = $this->salesChannelRepo->search(new Criteria(), $context);
		foreach ($salesChannels as $channel) {
			$salesChannelId = $channel->getId();
			$apiKey = $this->getIntegrationApiKey($salesChannelId);

			$keys[$apiKey] = $apiKey;
		}
		$this->submitApiKeys(array_filter(array_keys($keys)));
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
