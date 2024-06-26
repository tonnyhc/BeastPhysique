import { ImagePickerAsset } from "expo-image-picker";
import { Platform } from "react-native";
import { CustomExerciseData } from "../Stacks/CreateExerciseStack";

interface Height {
  feet?: number;
  inches?: number;
  centimeters?: number;
}
interface Weight {
  kilograms?: number;
  pounds?: number;
}
export function generateHeightArray(us: boolean = false): Height[] {
  const minHeight = 120; // in centimeters
  const maxHeight = 250;
  const heightArray: Height[] = [];

  for (let centimeters = minHeight; centimeters <= maxHeight; centimeters++) {
    const height: Height = us
      ? {
          feet: Math.floor(centimeters / 30.48),
          inches: Math.floor((centimeters % 30.48) / 2.54),
        }
      : { centimeters };

    heightArray.push(height);
  }

  return heightArray;
}

export function generateWeightArray(us: boolean = false): Weight[] {
  const minWeight = 30; // in kilograms
  const maxWeight = 250;
  const weightArray: Weight[] = [];

  for (let kilograms = minWeight; kilograms <= maxWeight; kilograms++) {
    const weight: Weight = us
      ? { pounds: Math.round(kilograms * 2.20462 * 10) / 10 }
      : { kilograms };

    weightArray.push(weight);
  }

  return weightArray;
}

export function checkForEmptyValuesInObject(values: {
  [key: string]: any;
}): boolean {
  for (const [key, value] of Object.entries(values)) {
    if (!value || value === "") {
      return true;
    }
  }
  return false;
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

export function removeTimeFromDate(date: Date): string {
  date.setHours(0, 0, 0, 0);
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}

export function transformExerciseDataToFormData(
  exerciseData: CustomExerciseData
) {
  const formData = new FormData();
  formData.append("name", exerciseData.name),
    formData.append("bodyweight", exerciseData.bodyweight.toString());
  formData.append("information", exerciseData.information);
  formData.append("tips", exerciseData.tips);
  formData.append("publish", exerciseData.publish.toString());
  if (exerciseData.cover_photo && exerciseData.cover_photo !== "") {
    formData.append("cover_photo", {
      uri: exerciseData.cover_photo,
      name: `${exerciseData.name}_cover_photo`,
      type: "image/jpeg",
    });
  }
  if (exerciseData.video_tutorial && exerciseData.video_tutorial !== "") {
    formData.append("video_tutorial", {
      uri: exerciseData.video_tutorial,
      name: `${exerciseData.name}_video_tutorial`,
      type: "video/mp4",
    });
  }

  for (const item of exerciseData.targeted_muscle_groups) {
    formData.append("targeted_muscle_groups", item.toString());
  }
  return formData;
}
