<?php

namespace App\Repository;

use Doctrine\ORM\EntityRepository;

class PeterTestRepository extends EntityRepository
{
    public function findAllOrderedByValue()
    {
        return $this->getEntityManager()
            ->createQuery(
                'SELECT p FROM App\Entity\PeterTest p ORDER BY p.value ASC'
            )
            ->getResult();
    }
}