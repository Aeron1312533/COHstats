<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CommanderAbilityViewRepository")
 * @ORM\Table(name="view_fact_commander_ability")
 */
class CommanderAbilityView
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     */
    private $commanderAbilityKey;

    /**
     * @ORM\Column(type="string", length=400)
     */
    private $commanderAbilityCode;

    /**
     * @ORM\Column(type="string", length=4000)
     */
    private $description;
    /**
     * @ORM\Column(type="string", length=300)
     */
    private $icon;
    /**
     * @ORM\Column(type="string", length=4000)
     */
    private $name;

    /**
     * Many Abilities have Many Commanders.
     * @ORM\ManyToMany(targetEntity="CommanderView", mappedBy="abilities")
     */
    private $commanders;

    public function __construct() {
        $this->commanders = new ArrayCollection();
    }

    final function __set($name, $value) {
	    if (!isset($this->{$name})) {
	      throw new Exception("Undefined property '$name'.");
	    } elseif (method_exists($this, 'set'.$name)) {
	      $this->{'set'.$name}($value);
	    } else {
	      throw new Exception("Property '$name' is read-only.");
	    }
    }


  final function __get($name) {
	    if (!isset($this->{$name})) {
	      throw new Exception("Undefined property '$name'.");
	    } elseif (method_exists($this, 'get'.$name)) {
	      return $this->{'get'.$name}();
	    } else {
	      return $this->{$name};
	    }
  }

      /**
     * @param CommanderView $commander
     */
    public function addCommander(CommanderView $commander)
    {
        if ($this->commanders->contains($commander)) {
            return;
        }

        $this->commanders->add($commander);
        $commander->addAbility($this);
    }

}