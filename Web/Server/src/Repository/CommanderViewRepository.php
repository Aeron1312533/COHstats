<?php

namespace App\Repository;

use Doctrine\ORM\EntityRepository;

class CommanderViewRepository extends EntityRepository
{
    public function findByFraction($name) {
        return $this->getEntityManager()
            ->createQuery(
                'SELECT cv FROM App\Entity\CommanderView cv WHERE cv.race = :name'
            )
            ->setParameter('name', $name)
            ->getResult();
    }
}