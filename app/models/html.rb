class Html < ActiveRecord::Base
	  attr_accessible :html, :merchant_id, :link_id, :parsed
end
