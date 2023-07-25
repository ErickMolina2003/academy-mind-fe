import axios from "axios";
import { useAppStore } from "@/store/app";
import AdminUpdate from "../../models/user";

export default class AdminService {
  store = useAppStore();

  async updateAdmin(id: string, adminData: AdminUpdate) {
    const url = `http://localhost:3001/api/user/${id}`;
   

    try {
      const response = await axios({
        method: "patch",
        url: url,
        data: adminData,
      });

      if (response.status === 200) {
        const user = await response.data.user;
        this.store.setUpdatedUser(user);
      
        this.store.setToaster({
          isActive: true,
          text: "¡Información actualizada correctamente!",
          color: "success",
        });
      }
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "¡Ha habido un error al actualizar!",
        color: "error",
      });
    }
  }

}