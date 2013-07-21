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

	def application_return_triple_dashes_if_blank(value)
		return value.blank? ? '---' : value
	end

	def application_get_page_obj_from(total_count,page_current,page_boundary,num_results_returned_per_page)
		page_obj = {}
		page_total = (total_count/num_results_returned_per_page).ceil
		page_boundary_middle = (page_boundary/2).ceil
		# if page_current not specified or page_current is greater than the total page available, redirect to no_found page
		return redirect_to '/not_found' if page_current.nil? || page_current > page_total

		is_page_current_lte_page_boundary_middle = page_current <= page_boundary_middle
		is_page_current_plus_page_boundary_middle_gt_page_total = (page_current + page_boundary_middle) > page_total

		if !is_page_current_lte_page_boundary_middle && !is_page_current_plus_page_boundary_middle_gt_page_total
			# page_current = 6, page_total = 100 return [2...10]
			page_start = page_current - page_boundary_middle
			page_end = page_current + page_boundary_middle
		elsif !is_page_current_lte_page_boundary_middle && is_page_current_plus_page_boundary_middle_gt_page_total
			# page_current = 11, page_total = 14 return [6...14]
			page_start = page_total - page_boundary + 1
			page_end = page_total
		elsif is_page_current_lte_page_boundary_middle && !is_page_current_plus_page_boundary_middle_gt_page_total
			# page_current = 4, page_total = 14 return [1...9]
			page_start = 1
			page_end = page_boundary
		else # page_total < page_boundary
			page_start = 1
			page_end = page_total
		end

		# fix incorrect values
		page_start = page_start >= 1 ? page_start : 1
		page_end = page_end <= page_total ? page_end : page_total

		page_obj[:boundaries] = (page_start...page_end+1).to_a
		page_obj[:current] = page_current
		page_obj[:first] = page_start
		page_obj[:last] = page_end
		page_obj[:prev] = (page_current - 1) > 0 ? (page_current - 1) : nil
		page_obj[:next] = (page_current + 1) <= page_end ? (page_current + 1) : nil

		return page_obj
	end
end
