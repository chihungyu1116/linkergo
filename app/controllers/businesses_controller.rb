class BusinessesController < ApplicationController
	include ApplicationHelper

	def index
		redirect_to '/not_found'
	end

	def show
		id = params[:id]
		@business = Merchant.find(id)
	end
end
