<?php

namespace App\Repository;

use Doctrine\ORM\EntityRepository;

class PeterTestRepository extends EntityRepository
{
    public function findAllOrderedByValue()
    {
        return $this->getEntityManager()
            ->createQuery(
                'SELECT p.value FROM App:PeterTest p ORDER BY p.value ASC'
            )
            ->getResult();
    }
}