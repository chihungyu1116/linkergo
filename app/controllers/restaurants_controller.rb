class RestaurantsController < ApplicationController

	include ApplicationHelper

	def index
	end

	def show
		num_merchants_returned = 20
		@restaurants = Merchant.first(num_merchants_returned)
		@page = application_get_page_from_merchant(num_merchants_returned)
	end
end
