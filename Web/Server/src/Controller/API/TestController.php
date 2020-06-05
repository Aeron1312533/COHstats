<?php


// src/Controller/ProductController.php
namespace App\Controller\API;

// ...
use App\Entity\PeterTest;
use App\Entity\CommanderView;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Validator\Validator\ValidatorInterface;
 
class TestController extends AbstractController
{
    public function show($id) {
        $product = $this->getDoctrine()
            ->getRepository(PeterTest::class)
            ->find($id);

        if (!$product) {
            throw $this->createNotFoundException(
                'No product found for id '.$id
            );
        }

        return new Response('Check out this great product: '.$product->getValue());

        // or render a template
        // in the template, print things with {{ product.name }}
        // return $this->render('product/show.html.twig', ['product' => $product]);
    }

    public function showAll() {
        $commanders = $this->getDoctrine()
            ->getRepository(CommanderView::class)
            ->findAll();

        if (!$commanders) {
            throw $this->createNotFoundException(
                'No commanders found'
            );
        }

        $resultArray = [];
        foreach ($commanders as $commander) {
            $resultArray[] = array(
                "commanderKey" -> $commander->commanderKey   
			);
		}
        return new JsonResponse($resultCommander);

        // or render a template
        // in the template, print things with {{ product.name }}
        // return $this->render('product/show.html.twig', ['product' => $product]);
    }
}