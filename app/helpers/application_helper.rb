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

		return redirect_to controller: 'application', action: 'not_found' if page_current > page_total

		if page_total < page_boundary # page_total = 8 return [1...8]
			page_start = 1
			page_end = page_total
		else
			if (page_current - 5 > 0) && (page_current + 5 > page_total) # page_current = 6 return [2...11]
				page_start = page_current - 4
				page_end = page_current + 5
			elsif (page_current - 5 > 0) && !(page_current + 5 > page_total) # page_current = 11, page_total = 14 return [5...14]
				page_start = page_total - 9
				page_end = page_total
			elsif !(page_current - 5 > 0) && (page_current + 5 > page_total) # page_current = 4, page_total = 14 return [1...10]
				page_start = 1
				page_end = 10
			end
		end

		page_obj[:boundaries] = [page_start,page_end]
		page_obj[:current] = page_current
	end
end
