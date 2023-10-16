<?php declare(strict_types=1);
/*
 * @copyright Papoo Software & Media GmbH
 * @author Christoph Grenz <info@papoo.de>
 * @date 2022-02-03
 */

namespace Papoo\Ccm19Integration\Subscriber;

use DateTime;
use DateTimeInterface;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Psr7\Request;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\System\SystemConfig\Event\SystemConfigChangedEvent;
use Shopware\Core\System\SystemConfig\SystemConfigService;
use Shopware\Storefront\Event\StorefrontRenderEvent;
use Shopware\Storefront\Page\Page;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Subscriber for configuration changes
 */
class ConfigChange implements EventSubscriberInterface
{
	private const API_TOKEN = 'xCHnQegWLeprUzBQFdPSsXAp6prvhaYI';

	/** @var SystemConfigService */
	private $config;
	/** @var Client */
	private $client;

	/** @var EntityRepositoryInterface */
	private $salesChannelRepo;

	private $shopwareVersion;
    private $instanceId;

	/**
	 * Initialize subscriber
	 */
	public function __construct(SystemConfigService $config, EntityRepositoryInterface $salesChannelRepo, string $shopwareVersion, ?string $instanceId)
	{
		$this->config = $config;
		$this->salesChannelRepo = $salesChannelRepo;
		$this->shopwareVersion = $shopwareVersion;
        $this->instanceId = $instanceId;
		$this->client = new Client();
	}

	/**
	 * @return array
	 */
	public static function getSubscribedEvents(): array
	{
		return [
			SystemConfigChangedEvent::class => 'onConfigurationChange',
		];
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

	/**
	 * Handler: on configuration change
	 *
	 * @param SystemConfigChangedEvent $args
	 * @return void
	 */
	public function onConfigurationChange(SystemConfigChangedEvent $event): void
	{
		if ($event->getKey() != 'papooCcm19Integration6.config.integrationCode') {
			return;
		}
		$context = Context::createDefaultContext();

		$changes = [];
		$salesChannels = $this->salesChannelRepo->search(new Criteria(), $context);
		foreach ($salesChannels as $channel) {
			$salesChannelId = $channel->getId();
			$apiKey = $this->getIntegrationApiKey($salesChannelId);
			if ($salesChannelId == $event->getSalesChannelId() && $event->getValue() === null) {
				$apiKey = null;
			}
			$cachedApiKey = $this->config->get('papooCcm19Integration6.internal.cachedApiKey', $salesChannelId);
			$this->config->set('papooCcm19Integration6.internal.cachedApiKey', $apiKey, $salesChannelId);

			if ($cachedApiKey !== $apiKey) {
				$changes[(string)$apiKey] = $cachedApiKey;
			}
		}
		if ($changes) {
			$this->onApiKeyChanges(array_filter(array_keys($changes)));
		}
	}

	private function generateHash(array $data) {
		ksort($data);
		$string = http_build_query($data, '', '&', PHP_QUERY_RFC1738);
		return hash_hmac('sha256', $string ?? '', self::API_TOKEN);
	}

	/**
	 * @param string[] $apiKeys
	 */
	private function onApiKeyChanges(array $apiKeys) {
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
