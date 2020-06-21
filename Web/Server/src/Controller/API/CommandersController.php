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
    public function findById($id) {
        $commander = $this->getDoctrine()
            ->getRepository(CommanderView::class)
            ->findById($id);

        if (!$commander) {
            throw $this->createNotFoundException(
                'No product found for id '.$id
            );
        }

        $resultArray = array(
                "abilities" =>$commander->abilities,
                "commanderKey" => $commander[0]->commanderKey,
                "description" => $commander[0]->description,
                "icon" => $commander[0]->icon,
                "iconSecondary" => $commander[0]->iconSecondary,
                "name" => $commander[0]->name,
                "race" => $commander[0]->race,
                "isInDefaultBundle" => $commander[0]->isInDefaultBundle

			);

        return new JsonResponse($resultArray);

        // or render a template
        // in the template, print things with {{ product.name }}
        // return $this->render('product/show.html.twig', ['product' => $product]);
    }

    public function findAll($name) {
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
                "abilities" =>$commander->abilities,
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