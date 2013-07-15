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

	def application_get_page_from_merchant(num_merchant_returned)

		page_obj = {}
		page_boundary = 10
		page_current = params[:id] ? params[:id].to_i : nil
		page_total = (Merchant.count/num_merchant_returned.to_f).ceil

		return redirect_to '/not_found' if page_current.nil? || page_current > page_total

		is_page_current_less_than_5 = page_current < 5
		is_page_current_plus_5_greater_than_page_total = (page_current + 5) > page_total

		if !is_page_current_less_than_5 && !is_page_current_plus_5_greater_than_page_total # page_current = 6, page_total = 100 return [2...11]
			page_start = page_current - 4
			page_end = page_current + 5
		elsif !is_page_current_less_than_5 && is_page_current_plus_5_greater_than_page_total # page_current = 11, page_total = 14 return [5...14]
			page_start = page_total - 9
			page_end = page_total
		elsif is_page_current_less_than_5 && !is_page_current_plus_5_greater_than_page_total # page_current = 4, page_total = 14 return [1...10]
			page_start = 1
			page_end = 10
		else # page_total < page_boundary
			page_start = 1
			page_end = page_total
		end

		page_obj[:boundaries] = (page_start...page_end+1).to_a
		page_obj[:current] = page_current

		return page_obj
	end
end
