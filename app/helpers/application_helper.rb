module ApplicationHelper
	def application_get_stars_from_score(score)
		score = score.to_f
		score_str = ''
		no_star = '<i class="icon-star-empty"></i>'		
		full_star = '<i class="icon-star"></i>'
		half_star = '<i class="icon-star-half-full"></i>'

		return no_star if score == 0

		while score >= 1
			score_str += full_star
			score -= 1
		end

		score_str += half_star if score == 0.5

		return score_str
	end

	def application_get_page_from_merchant(page_current,num_merchants_returned)
		page_obj = {}
		page_boundary = 10
		page_total = (Merchant.count/20.0).ceil

		redirect_to if page_current > page_total





		page_start = 1 if page_current <= 5
		page_start = (page_total - 1) - page_boundary if page_current >= page_total - 5


		191 192 193 194 195 196 197 198 199 200
		195
		200 

	end
end
