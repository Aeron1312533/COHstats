<?php
namespace App\Controller\API;

use Symfony\Component\HttpFoundation\JsonResponse;

class TestController
{
    public function test()
    {
        $number = random_int(0, 100);

        return new JsonResponse(
            ['response' => 'This is test response from API']
        );
    }
}