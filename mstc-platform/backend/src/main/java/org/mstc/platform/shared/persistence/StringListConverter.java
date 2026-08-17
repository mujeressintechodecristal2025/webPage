package org.mstc.platform.shared.persistence;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Converter JPA para List<String> ↔ String CSV.
 *
 * Permite que el mismo código JPA funcione con:
 * - PostgreSQL: columna TEXT[] (almacenada como texto CSV por este converter)
 * - H2: columna CLOB (almacenada como texto CSV)
 *
 * Formato: "tag1,tag2,tag3"
 */
@Converter
public class StringListConverter implements AttributeConverter<List<String>, String> {

    private static final String DELIMITER = ",";

    @Override
    public String convertToDatabaseColumn(List<String> tags) {
        if (tags == null || tags.isEmpty()) return null;
        return String.join(DELIMITER, tags);
    }

    @Override
    public List<String> convertToEntityAttribute(String csv) {
        if (csv == null || csv.isBlank()) return Collections.emptyList();
        return Arrays.asList(csv.split(DELIMITER, -1));
    }
}
