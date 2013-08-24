class ReviewsController < ApplicationController
	def index
		redirect_to '/not_found'
	end

	def new
		business_id = params[:business_id]
		begin
			merchant_obj = Merchant.find(business_id) 
		rescue
			return redirect_to '/not_found'
		end
	end
end
