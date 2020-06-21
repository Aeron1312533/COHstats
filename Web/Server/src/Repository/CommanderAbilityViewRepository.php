<?php

namespace App\Repository;

use Doctrine\ORM\EntityRepository;

class CommanderAbilityViewRepository extends EntityRepository
{
    public function findById($id) {
        return $this->getEntityManager()
            ->createQuery(
                'SELECT cav FROM App\Entity\CommanderAbilityView cav WHERE cav.commanderAbilityKey = :id'
            )
            ->setParameter('id', $id)
            ->getResult();
    }
}