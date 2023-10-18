<?php declare(strict_types=1);

namespace Papoo\Ccm19Integration\Service;

use Shopware\Core\Framework\MessageQueue\ScheduledTask\ScheduledTask;

class LicenseNotifyTask extends ScheduledTask
{
	public static function getTaskName(): string
	{
		return 'papoo.ccm19integration.license_notify_task';
	}

	public static function getDefaultInterval(): int
	{
		return 43200; // 12 hours
	}
}
