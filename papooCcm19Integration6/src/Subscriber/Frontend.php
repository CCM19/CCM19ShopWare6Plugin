<?php declare(strict_types=1);
/*
 * @copyright Papoo Software & Media GmbH
 * @author Christoph Grenz <info@papoo.de>
 * @date 2022-02-03
 */

namespace Papoo\Ccm19Integration\Subscriber;

use Papoo\Ccm19Integration\Util\CcmInformationStruct;
use Shopware\Core\System\SystemConfig\SystemConfigService;
use Shopware\Storefront\Event\StorefrontRenderEvent;
use Shopware\Storefront\Page\Page;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Subscriber for frontend events
 */
class Frontend implements EventSubscriberInterface
{
	/** @var SystemConfigService */
	private $config;

	public const CCM19_INTEGRATION_EXTENSION_ID = 'papooCcm19Integration';

	/**
	 * Initialize subscriber and read configuration
	 *
	 * @param SystemConfigService $configReader
	 */
	public function __construct(SystemConfigService $config)
	{
		$this->config = $config;
	}

	/**
	 * @return array
	 */
	public static function getSubscribedEvents(): array
	{
		return [
			StorefrontRenderEvent::class => 'injectCcmData',
		];
	}

	/**
	 * @param string|null Sales-Channel-ID (null for 'global')
	 * @return string|null
	 */
	private function getIntegrationUrl(?string $salesChannelId): ?string
	{
		$code = $this->config->get('papooCcm19Integration6.config.integrationCode', $salesChannelId);
		if (!$code) {
			return null;
		}

		$match = [];
		preg_match('~\bhttps?://[^"\'\s]{1,256}\.js\?(?>[^"\'\s]{1,128})~i', $code, $match);

		if (!$match or !$match[0]) {
			return null;
		}
		
		if (strpos($match[0], ';') === false) {
			return $match[0];
		} else {
			return html_entity_decode($match[0], ENT_HTML401|ENT_QUOTES, 'UTF-8');
		}
	}

	/**
	 * Hook: load integration url into template
	 *
	 * @param PageLoadedEvent $args
	 * @return void
	 */
	public function injectCcmData(StorefrontRenderEvent $event): void
	{
		$parameters = $event->getParameters();
		if(!isset($parameters['page'])) {
			return;
		}

		/** @var Page $page */
		$page = $parameters['page'];

		$salesChannel = $event->getSalesChannelContext()->getSalesChannelId();
		$data = new CcmInformationStruct(['url'=>$this->getIntegrationUrl($salesChannel)]);

		$page->addExtension(self::CCM19_INTEGRATION_EXTENSION_ID, $data);
	}
}
