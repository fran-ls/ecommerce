import type { ClientAddressDTO } from "../types/address.types";
import type { ClientDTO } from "../types/client.types";

export const clientState: ClientDTO = {
   name: '',
   phone: '',
   email: ''
}

export const addressState: ClientAddressDTO = {
   department: '',
   city: '',
   address: '',
   clientId: ''
}