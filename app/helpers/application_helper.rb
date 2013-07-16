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

	def application_get_page_obj_from(count,page_current,page_boundary,page_num_returned)
		page_obj = {}
		page_total = (count/page_num_returned).ceil
		page_total =8
		page_boundary_half = (page_boundary/2).ceil

		return redirect_to '/not_found' if page_current.nil? || page_current > page_total

		is_page_current_less_than_or_equal_to_page_boundary_half = page_current <= page_boundary_half
		is_page_current_plus_page_boundary_half_greater_than_page_total = (page_current + page_boundary_half) > page_total

		# based on page_boundary = 9
		if !is_page_current_less_than_or_equal_to_page_boundary_half && !is_page_current_plus_page_boundary_half_greater_than_page_total # page_current = 6, page_total = 100 return [2...10]
			page_start = page_current - page_boundary_half
			page_end = page_current + page_boundary_half
		elsif !is_page_current_less_than_or_equal_to_page_boundary_half && is_page_current_plus_page_boundary_half_greater_than_page_total # page_current = 11, page_total = 14 return [6...14]
			page_start = page_total - page_boundary + 1
			page_end = page_total
		elsif is_page_current_less_than_or_equal_to_page_boundary_half && !is_page_current_plus_page_boundary_half_greater_than_page_total # page_current = 4, page_total = 14 return [1...9]
			page_start = 1
			page_end = page_total
		else # page_total < page_boundary
			page_start = 1
			page_end = page_boundary
		end

		page_start = page_start >= 1 ? page_start : 1
		page_end = page_end <= page_total ? page_end : page_total

		page_obj[:boundaries] = (page_start...page_end+1).to_a
		page_obj[:current] = page_current


		return page_obj
	end
end
