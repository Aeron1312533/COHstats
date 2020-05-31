<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PeterTestRepository")
 * @ORM\Table(name="PeterTest")
 */
class PeterTest
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $value;

    public function getId()
    {
        return $this->id;
    }

    // ... getter and setter methods
    public function setValue($value) {
        $this->value = $value;
	}

    public function getValue() {
        return $this->value;
	}
}