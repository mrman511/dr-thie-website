import { servicesList } from "../data/services/services";

export default function getService(id, setState) {
  const service = servicesList.find((element) => element.id === id);
  setState(service);
}