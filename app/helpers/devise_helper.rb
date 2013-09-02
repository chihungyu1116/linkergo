module DeviseHelper
	def devise_error_messages! field_name

		# sign in error hack

		if flash[:alert] && flash[:alert].match(/Invalid email or password/)
			resource.errors[:email] = 'Invalid email or password'
			resource.errors[:password] = 'Invalid email or password'
		end

	    return nil if resource.errors.empty?
		resource.errors[field_name].empty? ? nil : resource.errors[field_name][0]
	end
end
