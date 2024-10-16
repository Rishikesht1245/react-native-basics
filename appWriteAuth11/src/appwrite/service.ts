// this service file can be used in any projects
import {ID, Account, Client} from 'appwrite';
import Config from 'react-native-config';
import Snackbar from 'react-native-snackbar';

// creating app write client
const appwriteClient = new Client();

// .env
const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECTID: string = Config.APPWRITE_PROJECTID!;

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

// service

class AppwriteService {
  // global variable
  account;

  // constructor will talk to the app write cloud using appwrite client
  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECTID);

    this.account = new Account(appwriteClient);
  }

  // create a new record of user inside app write
  async createAccount({email, password, name}: CreateUserAccount) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );

      if(userAccount){
        return this.login({
            email, password
        })
      }else {
        return userAccount
      }
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
      console.log('Appwrite service :: createAccount() ::' + error);
    }
  }

  // login user : createEmailPasswordSession
  async login ({email, password}: LoginUserAccount){
    try {
        return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
        Snackbar.show({
            text: String(error),
            duration: Snackbar.LENGTH_LONG,
          });
          console.log('Appwrite service :: login() ::' + error);
    }
  }

  // get current user : get()
  async getCurrentUser(){
    try {
        return await this.account.get()
    } catch (error) {
        Snackbar.show({
            text: String(error),
            duration: Snackbar.LENGTH_LONG,
          });
          console.log('Appwrite service :: getCurrentUser() ::' + error);
    }
  }

  // logout : deleteSession
  async logout (){
    try {
        // 'current' -> current session
        return await this.account.deleteSession('current')
    } catch (error) {
        Snackbar.show({
            text: String(error),
            duration: Snackbar.LENGTH_LONG,
          });
          console.log('Appwrite service :: logout() ::' + error);
    }
  }
}

export default AppwriteService;
