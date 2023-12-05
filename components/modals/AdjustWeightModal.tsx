import { ListRestart } from "lucide-react";

import { Nutrient } from "@/types/types";
import { useModal } from "@/hooks/useModalStore";
import { useWeight } from "@/context/WeightContext";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import WeightSlider from "@/app/(dashboard)/(routes)/compare/_components/WeightSlider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";

const AdjustWeightModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { nutrientWeights, updateNutrientWeight, resetNutrientWeights } =
    useWeight();

  const isModalOpen = isOpen && type === "adjustWeight";

  const handleSliderChange = (nutrient: string, weight: number) => {
    updateNutrientWeight(nutrient as Nutrient, weight);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="space-y-4 sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="text-start">
              <DialogTitle className="text-primary-800">
                Adjust Weights
              </DialogTitle>
              <DialogDescription className="text-neutral-500">
                Fine-Tune Nutrient Distribution
              </DialogDescription>
            </div>
            <Button
              onClick={resetNutrientWeights}
              className="mr-5 rounded-md p-2.5"
            >
              <ListRestart className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[450px] px-5">
          <div className="space-y-4">
            <WeightSlider
              label="Calories"
              value={nutrientWeights.calories}
              onValueChange={(value) => handleSliderChange("calories", value)}
            />
            <WeightSlider
              label="Fats"
              value={nutrientWeights.fats}
              onValueChange={(value) => handleSliderChange("fats", value)}
            />
            <WeightSlider
              label="Saturated Fats"
              value={nutrientWeights.saturated}
              onValueChange={(value) => handleSliderChange("saturated", value)}
            />
            <WeightSlider
              label="monounsaturated Fats"
              value={nutrientWeights.monounsaturated}
              onValueChange={(value) =>
                handleSliderChange("monounsaturated", value)
              }
            />
            <WeightSlider
              label="Polyunsaturated Fats"
              value={nutrientWeights.polyunsaturated}
              onValueChange={(value) =>
                handleSliderChange("polyunsaturated", value)
              }
            />
            <WeightSlider
              label="Proteins"
              value={nutrientWeights.proteins}
              onValueChange={(value) => handleSliderChange("proteins", value)}
            />
            <WeightSlider
              label="Carbohydrates"
              value={nutrientWeights.carbohydrates}
              onValueChange={(value) =>
                handleSliderChange("carbohydrates", value)
              }
            />
            <WeightSlider
              label="Sugar"
              value={nutrientWeights.sugar}
              onValueChange={(value) => handleSliderChange("sugar", value)}
            />
            <WeightSlider
              label="Fiber"
              value={nutrientWeights.fiber}
              onValueChange={(value) => handleSliderChange("fiber", value)}
            />
            <WeightSlider
              label="Salt"
              value={nutrientWeights.salt}
              onValueChange={(value) => handleSliderChange("salt", value)}
            />
            <WeightSlider
              label="Water"
              value={nutrientWeights.water}
              onValueChange={(value) => handleSliderChange("water", value)}
            />
            <WeightSlider
              label="Calcium"
              value={nutrientWeights.calcium}
              onValueChange={(value) => handleSliderChange("calcium", value)}
            />
            <WeightSlider
              label="Chloride"
              value={nutrientWeights.chloride}
              onValueChange={(value) => handleSliderChange("chloride", value)}
            />
            <WeightSlider
              label="Potassium"
              value={nutrientWeights.potassium}
              onValueChange={(value) => handleSliderChange("potassium", value)}
            />
            <WeightSlider
              label="Magnesium"
              value={nutrientWeights.magnesium}
              onValueChange={(value) => handleSliderChange("magnesium", value)}
            />
            <WeightSlider
              label="Sodium"
              value={nutrientWeights.sodium}
              onValueChange={(value) => handleSliderChange("sodium", value)}
            />
            <WeightSlider
              label="Phosphorus"
              value={nutrientWeights.phosphorus}
              onValueChange={(value) => handleSliderChange("phosphorus", value)}
            />
            <WeightSlider
              label="Sulfur"
              value={nutrientWeights.sulfur}
              onValueChange={(value) => handleSliderChange("sulfur", value)}
            />
            <WeightSlider
              label="Copper"
              value={nutrientWeights.copper}
              onValueChange={(value) => handleSliderChange("copper", value)}
            />
            <WeightSlider
              label="Fluoride"
              value={nutrientWeights.fluoride}
              onValueChange={(value) => handleSliderChange("fluoride", value)}
            />
            <WeightSlider
              label="Iron"
              value={nutrientWeights.iron}
              onValueChange={(value) => handleSliderChange("iron", value)}
            />
            <WeightSlider
              label="Iodine"
              value={nutrientWeights.iodine}
              onValueChange={(value) => handleSliderChange("iodine", value)}
            />
            <WeightSlider
              label="Manganese"
              value={nutrientWeights.manganese}
              onValueChange={(value) => handleSliderChange("manganese", value)}
            />
            <WeightSlider
              label="Zinc"
              value={nutrientWeights.zinc}
              onValueChange={(value) => handleSliderChange("zinc", value)}
            />
            <WeightSlider
              label="Selenium"
              value={nutrientWeights.selenium}
              onValueChange={(value) => handleSliderChange("selenium", value)}
            />
            <WeightSlider
              label="Vitamin A"
              value={nutrientWeights.vitaminA}
              onValueChange={(value) => handleSliderChange("vitaminA", value)}
            />
            <WeightSlider
              label="Vitamin B1"
              value={nutrientWeights.vitaminB1}
              onValueChange={(value) => handleSliderChange("vitaminB1", value)}
            />
            <WeightSlider
              label="Vitamin B2"
              value={nutrientWeights.vitaminB2}
              onValueChange={(value) => handleSliderChange("vitaminB2", value)}
            />
            <WeightSlider
              label="Vitamin B3"
              value={nutrientWeights.vitaminB3}
              onValueChange={(value) => handleSliderChange("vitaminB3", value)}
            />
            <WeightSlider
              label="Vitamin B5"
              value={nutrientWeights.vitaminB5}
              onValueChange={(value) => handleSliderChange("vitaminB5", value)}
            />
            <WeightSlider
              label="Vitamin B6"
              value={nutrientWeights.vitaminB6}
              onValueChange={(value) => handleSliderChange("vitaminB6", value)}
            />
            <WeightSlider
              label="Vitamin B7"
              value={nutrientWeights.vitaminB7}
              onValueChange={(value) => handleSliderChange("vitaminB7", value)}
            />
            <WeightSlider
              label="Vitamin B9"
              value={nutrientWeights.vitaminB9}
              onValueChange={(value) => handleSliderChange("vitaminB9", value)}
            />
            <WeightSlider
              label="Vitamin B12"
              value={nutrientWeights.vitaminB12}
              onValueChange={(value) => handleSliderChange("vitaminB12", value)}
            />
            <WeightSlider
              label="Vitamin C"
              value={nutrientWeights.vitaminC}
              onValueChange={(value) => handleSliderChange("vitaminC", value)}
            />
            <WeightSlider
              label="Vitamin D"
              value={nutrientWeights.vitaminD}
              onValueChange={(value) => handleSliderChange("vitaminD", value)}
            />
            <WeightSlider
              label="Vitamin E"
              value={nutrientWeights.vitaminE}
              onValueChange={(value) => handleSliderChange("vitaminE", value)}
            />
            <WeightSlider
              label="Vitamin K"
              value={nutrientWeights.vitaminK}
              onValueChange={(value) => handleSliderChange("vitaminK", value)}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AdjustWeightModal;
