<?php


// src/Controller/ProductController.php
namespace App\Controller\API;

// ...
use App\Entity\PeterTest;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Validator\Validator\ValidatorInterface;
 
class TestController extends AbstractController
{

    public function test(ValidatorInterface $validator): Response
    {
        // you can fetch the EntityManager via $this->getDoctrine()
        // or you can add an argument to the action: createProduct(EntityManagerInterface $entityManager)
        $entityManager = $this->getDoctrine()->getManager();

        $product = new PeterTest();
        $product->setValue('Keyboard');
        // tell Doctrine you want to (eventually) save the Product (no queries yet)
        $entityManager->persist($product);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();
        $errors = $validator->validate($product);
        return new Response('Saved new product with id '.$product->getId());
    }

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
        $product = $this->getDoctrine()
            ->getRepository(PeterTest::class)
            ->findAllOrderedByValue();

        if (!$product) {
            throw $this->createNotFoundException(
                'No product found for id '.$id
            );
        }
        $resultArray = [];

        foreach($product as $item) {
            $resultArray[] = $item->getValue();
		}
        return new JsonResponse($resultArray);

        // or render a template
        // in the template, print things with {{ product.name }}
        // return $this->render('product/show.html.twig', ['product' => $product]);
    }
}