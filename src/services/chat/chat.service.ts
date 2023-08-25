import axios from "axios";
import { useAppStore } from "../../store/app";

export default class ChatService {
    store = useAppStore();

    // Mandar correo de solicitud de amistad
    async sendFriendshipRequest(sender:string, receptor:string) {
            const url = `http://localhost:3001/api/section/friend-request/${sender}?receptor=${receptor}`;
            try {
                const response = await axios({
                    method: "GET",
                    url: url,
                });
                
                if (response.status===200) {
                    const data = await response.data;
                    
                    if (data.statusCode!==200) {
                        this.store.setToaster({
                            isActive: true,
                            text: "Error al enviar correo. Por favor, inténtelo de nuevo más tarde.",
                            color: "error",
                        });
                    } 
                    return data;
                } else {
                    this.store.setToaster({
                        isActive: true,
                        text: "Error al enviar correo. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                
                
            } catch (error) {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al enviar correo. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
                return error;
            }
        }
}