class RestaurantsController < ApplicationController
	def index
		num_merchants_returned = 20
		@restaurants = Merchant.first(num_merchants_returned)
		@page = application_get_page_from_merchant(page_current,num_merchants_returned)
	end
end
