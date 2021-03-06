// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * This javascript is for the mod_form.php (activity parameters)
 * Dirty trick to change a little bit a label text...
 * Also explained in the end user documentation.
 *
 * @package     mod_dynamo
 * @copyright   2019 UCLouvain
 * @author      Dominique Palumbo 
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
$( document ).ready(function() {
    var val = $('[name="dynamo_newtext"]').val();
    $('#id_completionview').parent().get(0).lastChild.nodeValue = val;
    if($('#id_completionview').parent().get(0).lastChild.nodeValue != val) {
        $('#id_completionview').next().html(val);
    }
});