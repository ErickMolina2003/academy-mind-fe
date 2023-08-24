import { db } from "@/firebase";
import { useAppStore } from "@/store/app";
import { onValue, ref, set } from "firebase/database";

export default class ChatService {
  store = useAppStore();

  async getCreateStudent() {
    let students = [];
    let studentsAccountNumbers;
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((student) => {
          students.push(student);
        });
      }
    });

    students.forEach((student) => {
      studentsAccountNumbers.push(student.accountNumber);
    });

    if (
      students.length == 0 ||
      !studentsAccountNumbers.includes(this.store.user.student.accountNumber)
    ) {
      const profilePicture =
        this.store.user.student.currentPhoto == 1
          ? this.store.user.student.photoOne
          : this.store.user.student.currentPhoto == 2
          ? this.store.user.student.photoTwo
          : this.store.user.student.photoThree;

      set(ref(db, `/${this.store.user.student.accountNumber}`), {
        accountNumber: this.store.user.student.accountNumber,
        name: `${this.store.user.firstName} ${this.store.user.firstLastName}`,
        profilePicture: profilePicture ?? "https://i.stack.imgur.com/34AD2.jpg",
        friends: [],
        friendRequests: [],
        chats: [],
        isOnline: true
      });
    }
    console.log(students);
    console.log(students.length);
    return { students };
  }
}
