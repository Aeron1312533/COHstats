<?php


namespace App\Controller\API;

// ...
use App\Entity\CommanderView;
use App\Utils\FractionMapper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Validator\Validator\ValidatorInterface;
 
class CommandersController extends AbstractController
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

    public function showAll($name) {
        $commanders = $this->getDoctrine()
            ->getRepository(CommanderView::class)
            ->findByFraction(FractionMapper::map($name));

        if (!$commanders) {
            throw $this->createNotFoundException(
                'No commanders found'
            );
        }
        $resultArray = [];
        foreach ($commanders as $commander) {
            $resultArray[] = array(
                "commanderKey" => $commander->commanderKey,
                "description" => $commander->description,
                "icon" => $commander->icon,
                "iconSecondary" => $commander->iconSecondary,
                "name" => $commander->name,
                "race" => $commander->race,
                "isInDefaultBundle" => $commander->isInDefaultBundle

			);
		}
        return new JsonResponse($resultArray);

        // or render a template
        // in the template, print things with {{ product.name }}
        // return $this->render('product/show.html.twig', ['product' => $product]);
    }
}