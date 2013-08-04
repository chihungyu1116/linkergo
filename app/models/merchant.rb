class Merchant < ActiveRecord::Base
	# allow merchant.reviews to find what reviews user has written to this merchant
	has_many :reviews
end
