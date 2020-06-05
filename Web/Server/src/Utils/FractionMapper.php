<?php

namespace App\Utils;

class FractionMapper {
   public static function map($fraction) { 
        switch ($fraction) {
            case "Wehrmacht":
                return "Wehrmacht";
            case "Us":
                return "US Forces";
            case "Soviet":
                return "Soviet";
            case "Oberkommando":
                return "Oberkommando West";
            case "British":
                return "British Forces"
            default:
                throw new Exception("Unknown fraction");
		}
    } 
}