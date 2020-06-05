<?php

namespace App\Repository;

use Doctrine\ORM\EntityRepository;

class CommanderViewRepository extends EntityRepository
{
    public function findAll()
    {
        return $this->getEntityManager()
            ->createQuery(
                'SELECT cv FROM App\Entity\CommanderView cv'
            )
            ->getResult();
    }
}