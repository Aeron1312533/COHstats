<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CommanderViewRepository")
 * @ORM\Table(name="view_fact_commander")
 */
class CommanderView
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     */
    private $commanderKey;

    /**
     * @ORM\Column(type="string", length=4000)
     */
    private $description;
    /**
     * @ORM\Column(type="string", length=300)
     */
    private $icon;
    /**
     * @ORM\Column(type="string", length=300)
     */
    private $iconSecondary;
        /**
     * @ORM\Column(type="string", length=4000)
     */
    private $name;
    /**
     * @ORM\Column(type="string", length=17)
     */
    private $race;
        /**
     * @ORM\Column(type="string", length=20)
     */
    private $isInDefaultBundle;

    final function __set($name, $value) {
	    if (!isset($this->_props[$name])) {
	      throw new Exception("Undefined property '$name'.");
	    } elseif (method_exists($this, 'set'.$name)) {
	      $this->{'set'.$name}($value);
	    } else {
	      throw new Exception("Property '$name' is read-only.");
	    }
    }


  final function __get($name) {
	    if (!isset($this->_props[$name])) {
	      throw new Exception("Undefined property '$name'.");
	    } elseif (method_exists($this, 'get'.$name)) {
	      return $this->{'get'.$name}();
	    } else {
	      return $this->{$name};
	    }
  }

}