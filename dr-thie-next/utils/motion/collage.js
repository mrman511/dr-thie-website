import { faRotate } from "@fortawesome/free-solid-svg-icons";

export function collageImageMotion(rotation, z) {
  return {
    enter: {
      initial: {
        transform: `rotate(${rotation})`,
        zIndex: z
      },
      animate: {
        transform: 'rotate(0)',
        zIndex: 20,
      },
      exit: {
        transform: `rotate(${rotation})`,
        zIndex: z
      },
    },
    exit: {
      initial: {
        transform: 'rotate(0)',
        zIndex: 20,
      },
      animate: {
        transform: `rotate(${rotation})`,
        zIndex: z
      },
      exit: {
        transform: 'rotate(0)',
        zIndex: 20,
      },
    }
  }
}