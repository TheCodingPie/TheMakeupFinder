import domain from './domain'
export default class httpService {
    static login = async (id,password) => {
      try 
      {
          const fetchUrl= domain + 'login/' + id + "/" + password;
          const response= await fetch(fetchUrl)
         if (response.status !== 200) {
             return false //"Looks like there was a problem. Status Code: " + response.status
          } 
          else {
            return response.json();
          }
      }
     catch (e) 
     {
        console.log(e);
        return false;
     }



  }
    static createClient = async (username,password,name,lastname,email)=>
    {
        const fetchUrl= domain + 'createClient/' + username + "/" + password + "/" + name + "/" + lastname + "/" + email;
        try
        {
            const response= await fetch(fetchUrl);
            if (response.status !== 200) 
            {
              return "error"; 
            } 
          else 
          {
            return response.json();
          }
        }
        catch (e)
        {
              console.log(e);
              return "error";
        }   
  }

  static createArtist = async (data)=>
  {
    console.log(data);
    const fetchUrl= domain + 'createArtist/';
    try
    {
      const options = {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      };
      const response = await fetch(fetchUrl, options);
      if (response.status !== 200) 
         {
           console.log(response.status)
              return "error"; 
         } 
       else 
        {
            return response.json();
        }
    }
    catch (e)
    {
          console.log(e);
          return "error";
    }   
  }

}








  

