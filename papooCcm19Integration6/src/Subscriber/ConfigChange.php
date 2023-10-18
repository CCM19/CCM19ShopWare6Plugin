<?php declare(strict_types=1);
/*
 * @copyright Papoo Software & Media GmbH
 * @author Christoph Grenz <info@papoo.de>
 * @date 2022-02-03
 */

namespace Papoo\Ccm19Integration\Subscriber;

use Papoo\Ccm19Integration\Service\LicenseNotifyTaskHandler;
use Shopware\Core\System\SystemConfig\Event\SystemConfigChangedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Subscriber for configuration changes
 */
class ConfigChange implements EventSubscriberInterface
{
	/** @var LicenseNotifyTaskHandler */
	private $handler;

	/**
	 * Initialize subscriber
	 */
	public function __construct(LicenseNotifyTaskHandler $handler)
	{
		$this->handler = $handler;
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

		$this->handler->run([
			$event->getSalesChannelId() => $event->getValue()
		]);
	}
}
