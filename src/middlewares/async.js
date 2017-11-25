export default function({dispatch}){
	return next => action =>{
		//if action does not have payload
		//or, the payload doesnot have a .then property
		//we dont care about it, send it on

		if(!action.payload || !action.payload.then){
			return next(action)
		}

		//Make sure the action's promise resolves
		action.payload
		.then(function(response){
			//create a new action with old type, but
			//replace the promise with the response data
			const newAction = {...action,payload:response};
			//passing the action to next middleware
			dispatch(newAction)
		});
	}
}

//there's a stack of middlewares whose job is to handle
//the unresolved response. Unless the response is resolved
//it keeps on flowing from a middleware to another
//and the dispatch method mentioned above helps in doing so