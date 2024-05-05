//THROUGH PROMISE METHOD
const asyncHandler = (requesHandler) => {
    return (req, res, next) => {
      Promise.resolve(requesHandler(req, res, next)).catch((err) => next(err));
    };
  };
  
  export default asyncHandler;
  
  /*const asyncHandler = () =>{}
  const asyncHandler = (fn) =>() =>{}
  const asyncHandler = (fn) => async() =>{}
  */
  
  //TRY CATCH METHOD BELOW
  
  /*const asyncHandler = (fn)=> async(err,req,res,next) =>{
      try {
          await fn(req,res,next)
      } catch (error) {
          res.status(err.code || 400).json({
              success: false,
              message: err.message
          })
      }
  }*/
  