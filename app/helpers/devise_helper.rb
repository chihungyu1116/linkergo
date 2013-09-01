module DeviseHelper
	def devise_error_messages! field_name
	    return nil if resource.errors.empty?
		resource.errors[field_name].empty? ? nil : resource.errors[field_name][0]
	end
end
