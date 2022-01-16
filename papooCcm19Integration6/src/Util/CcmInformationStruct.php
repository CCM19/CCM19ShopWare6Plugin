<?php
/*
 * @copyright Papoo Software & Media GmbH
 * @author Christoph Grenz <info@papoo.de>
 * @date 2021-04-14
 */

namespace Papoo\Ccm19Integration\Util;

use Shopware\Core\Framework\Struct\Struct;

class CcmInformationStruct extends Struct
{
	protected $url;

	public function __construct(array $options=[])
	{
		$this->assign($options);
	}

	public function getUrl(): ?string
	{
		return $this->url;
	}

	public function setUrl(?string $url): void
	{
		$this->url = $url;
	}
}
