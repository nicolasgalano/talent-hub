import axios from "axios";

const validateReCaptcha = async (token: string): Promise<boolean> => {
  const secretKey = "6LfszyMeAAAAAGotfKSFDqg81zT2qh5Jmn1yGCB3";
  // Validate with Google servers
  return axios({
    method: 'post',
    url: `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    
  })
  .then((res) => {
    if(res.data.success){
      console.log('success');
      return true;
    }else{
      console.log('fail');
      return false;
    }
  })
  .catch((err) => false);
}
export default validateReCaptcha;