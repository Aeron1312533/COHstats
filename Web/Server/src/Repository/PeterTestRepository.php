<?php

namespace App\Repository;

use Doctrine\ORM\EntityRepository;

class ProductRepository extends EntityRepository
{
    public function findAllOrderedByValue()
    {
        return $this->getEntityManager()
            ->createQuery(
                'SELECT p.value FROM PeterTest p ORDER BY p.name ASC'
            )
            ->getResult();
    }
}