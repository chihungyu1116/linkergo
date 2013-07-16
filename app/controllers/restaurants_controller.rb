class RestaurantsController < ApplicationController

	include ApplicationHelper

	def index
		redirect_to '/not_found'
	end

	def show
		page_current = params[:id] ? params[:id].to_i : nil
		page_num_returned = 10
		page_boundary = 9
		page_offset = page_current*page_num_returned
		count = Merchant.count

		@restaurants = Merchant.limit(page_num_returned).offset(page_offset)
		@pages = application_get_page_obj_from(count,page_current,page_boundary,page_num_returned)
	end
end
