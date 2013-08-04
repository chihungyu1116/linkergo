class Review < ActiveRecord::Base
	# [!!! important concept] 
	# belongs_to -> a review belongs to a user
	# review has user_id that references a user,
	# has one -> a review has one user then user has a review_id that references a review
	# we would like to have many reviews_id in a user
	# thus use belongs_to 
	# http://guides.rubyonrails.org/association_basics.html
	# 2,1 2.2
	belongs_to :user
	belongs_to :merchant
end
