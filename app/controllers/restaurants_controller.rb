class RestaurantsController < ApplicationController

	include ApplicationHelper

	def index
		redirect_to '/not_found'
	end

	def show
		page_current = params[:id] ? params[:id].to_i : nil
		page_boundary = 9
		num_results_returned_per_page = 10
		results_offset = page_current*num_results_returned_per_page
		count = Merchant.count

		@restaurants = Merchant.limit(num_results_returned_per_page).offset(results_offset)
		@pages = application_get_page_obj_from(count,page_current,page_boundary,num_results_returned_per_page)
	end
end
